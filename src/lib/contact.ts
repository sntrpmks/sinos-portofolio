export const contactInfo = {
  email: "sinatriapamungkas0@gmail.com",
  github: "https://github.com/sntrpmks",
  linkedin: "https://www.linkedin.com/in/sntrpmks",
  githubHandle: "@sntrpmks",
  linkedinHandle: "Sinatria Pamungkas",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=sinatriapamungkas0%40gmail.com",
  mailtoUrl: "mailto:sinatriapamungkas0@gmail.com",
};

export function handleQuickEmail(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  // Attempt Gmail web compose in new tab, fallback to mailto
  const win = window.open(contactInfo.gmailComposeUrl, "_blank", "noopener,noreferrer");
  if (!win || win.closed || typeof win.closed === "undefined") {
    window.location.href = contactInfo.mailtoUrl;
  }
}
