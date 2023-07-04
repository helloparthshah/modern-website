---
date: 07/04/2023
title: PID Controller - Lane Following car
tags:
- projects
authors:
  - Parth Shah
  - Kunal Pai
image: /images/lane.png
---
# PID Controller - Lane Following car
[Demo](https://helloparthshah.github.io/lane-car-pid/)
[Code](https://www.github.com/helloparthshah/lane-car-pid)

## What is a PID Controller?
PID Controller is a control loop feedback mechanism widely used in industrial control systems and a variety of other applications requiring continuously modulated control. A PID controller continuously calculates an error value as the difference between a desired setpoint and a measured process variable and applies a correction based on proportional, integral, and derivative terms (sometimes denoted P, I, and D respectively), hence the name.

## Inspiration
A few weeks ago, I rented a Tesla Model 3 and was fascinated by the autopilot feature. I wanted to build something similar. I started researching and found out that the autopilot feature uses a PID controller to control the steering angle of the car. I decided to build a lane following car using a PID controller.

## How did I build it?

I this simulation using [`p5.js`](https://p5js.org/) so that I could easily showcase and share this. It consists of 3 main components: the car, the track, and the PID controller.

### The Car

The car is a simple retangular png image of an ATV. The car has a position, a velocity, and an angle.

The car's `y` position is always fixed since all of the movement is achieved by moving the track.

Every frame, the car's `update` function is called. The `update` function uses the PID controller to steer the car by changing the angle of the car. This angle is then used to update the velocity and `x` position of the car.

2 Lines are then drawn from the car's position. The yellow line is the direction the car is facing and the green line is the point on the lane the car is trying to reach.

### The Track

The track contains 5 lanes and each lane consists of 2 lines with a dashed line in the middle.

In order to show that the car is moving, the dashed lines are changed by a phase equal to the velocity of the car. This gives the illusion that the car is moving.

### PID Controller

The PID controller is a feedback loop that takes in the current position of the car and the desired position of the car and outputs a steering angle. The PID controller is made up of three components: the proportional component, the integral component, and the derivative component.

```js
calculate(controlVariable, targetValue, deltaTime) {
    const error = targetValue - controlVariable;
    this.integral += error * deltaTime;
    const derivative = (error - this.prevError) / deltaTime;

    const output = this.Kp * error + this.Ki * this.integral + this.Kd * derivative;

    this.prevError = error;

    return output;
}
```

#### Proportional Component

The proportional component is proportional to the error. It is the difference between the desired position and the current position. The proportional component is the main component of the PID controller. It is responsible for the majority of the steering.

#### Integral Component

The integral component is proportional to the integral of the error. It is the sum of all the errors over time. The integral component is responsible for correcting any bias in the system.

#### Derivative Component

The derivative component is proportional to the derivative of the error. It is the difference between the current error and the previous error. The derivative component is responsible for correcting any overshoot in the system.

## Conclusion

This was a fun project to work on. I learned a lot about PID controllers and how they work. I also learned a lot about how to use `p5.js` and how to make simulations.

## References

- [Wikipedia](https://en.wikipedia.org/wiki/PID_controller)