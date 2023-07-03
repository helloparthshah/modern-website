export function generateMLACitation(data) {
    let authorList;
    if (data.authors.length > 2) {
        authorList = `${data.authors[0]}, et al.`;
    } else {
        authorList = data.authors.join(', ');
    }

    const conference = data.conference || data.link.match(/https:\/\/([^/]+)/)[1];

    const citation = `${authorList}. "${data.title}." ${conference}, ${data.link}.`;

    return citation;
}

export function generateChicagoCitation(data) {
    function formatAuthors(authors) {
        return authors.join(", ");
    };

    function formatDate(date) {
        // If the date is not provided, return "n.d." (no date).
        return date ? date : "n.d.";
    };

    const formattedAuthors = formatAuthors(data.authors);
    const formattedDate = formatDate(data.date);

    return `${formattedAuthors}. “${data.title}.” ${data.conference}, ${formattedDate}, ${data.link}.`;
}

export function generateIEEECitation(data) {
    function formatAuthorName(author) {
        const nameParts = author.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}. ${nameParts[nameParts.length - 1]}`;
        }
        return author;
    }
    // Format the authors' names with initials
    const formattedAuthors = data.authors.map(formatAuthorName).join(', ');

    // Extracting the center portion of the URL
    const conference = data.conference || (data.link && data.link.match(/https:\/\/([^\/]+)\./)?.[1])

    // Format the citation
    const citation = `[1] ${formattedAuthors}, "${data.title}," ${conference}. Available: ${data.link}`;
    return citation;
}
