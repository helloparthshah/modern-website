# Generates a seamless chalkboard texture (slate grain, uneven tone, eraser swipes, dust).
import sys, numpy as np
from PIL import Image, ImageFilter
rng = np.random.default_rng(7)
N = 1024

def fft_noise(beta):
    # Spectral noise is periodic, so the texture tiles without seams.
    f = np.fft.fftfreq(N)
    fx, fy = np.meshgrid(f, f)
    r = np.sqrt(fx**2 + fy**2); r[0, 0] = 1
    spec = (rng.normal(size=(N, N)) + 1j * rng.normal(size=(N, N))) / r**beta
    spec[0, 0] = 0
    n = np.real(np.fft.ifft2(spec))
    return (n - n.mean()) / n.std()

tone = fft_noise(1.8)          # large blotchy variation
grain = fft_noise(0.6)         # fine slate grain
dust = rng.random((N, N))

base = np.array([38, 58, 51], dtype=float)  # slate green
lum = 1 + 0.06 * tone + 0.035 * grain
img = base[None, None, :] * lum[..., None]

# Eraser swipes: wide, soft, slightly lighter arcs drawn with wrap-around.
swipe = np.zeros((N, N))
yy, xx = np.mgrid[0:N, 0:N]
for _ in range(12):
    cx, cy = rng.uniform(0, N, 2)
    rad = rng.uniform(250, 650)
    width = rng.uniform(35, 80)
    a0 = rng.uniform(0, 2 * np.pi); span = rng.uniform(0.6, 1.4)
    for ox in (-N, 0, N):
        for oy in (-N, 0, N):
            dx = xx - (cx + ox); dy = yy - (cy + oy)
            d = np.sqrt(dx**2 + dy**2)
            ang = (np.arctan2(dy, dx) - a0) % (2 * np.pi)
            band = np.exp(-((d - rad) / width) ** 2) * (ang < span) * np.sin(np.clip(ang / span, 0, 1) * np.pi)
            swipe += band * rng.uniform(0.5, 1.0)
swipe = np.array(Image.fromarray((np.clip(swipe, 0, 3) / 3 * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6)), dtype=float) / 255
# Streaky residue: anisotropic noise (stretched along x) modulates the swipes.
f = np.fft.fftfreq(N); fx, fy = np.meshgrid(f, f)
r = np.sqrt((fx * 6) ** 2 + (fy * 0.6) ** 2); r[0, 0] = 1
spec = (rng.normal(size=(N, N)) + 1j * rng.normal(size=(N, N))) / r ** 0.9; spec[0, 0] = 0
streak = np.real(np.fft.ifft2(spec)); streak = (streak - streak.mean()) / streak.std()
residue = swipe * np.clip(0.6 + 0.45 * streak, 0, 1.6)
img += residue[..., None] * np.array([34, 38, 36])
img += np.clip(grain, 0, None)[..., None] * 2.5

# Chalk dust speckles
specks = (dust > 0.9965) * rng.uniform(10, 35, (N, N))
img += specks[..., None]

img = np.clip(img, 0, 255).astype(np.uint8)
Image.fromarray(img).save(sys.argv[1], quality=82, optimize=True, progressive=True)
