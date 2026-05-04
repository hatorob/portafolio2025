import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaFilePdf, FaGlobe } from "react-icons/fa";
import { ProfileStore } from "../../store/ProfileStore";

export const FloatingSocialLinks = () => {
  const { profile } = ProfileStore();

  const mediaSocial = profile?.mediaSocial;

  const links = [
    {
      label: "CV",
      url: profile?.cv,
      icon: <FaFilePdf />,
    },
    {
      label: "GitHub",
      url: mediaSocial?.github,
      icon: <FaGithub />,
    },
    {
      label: "LinkedIn",
      url: mediaSocial?.linkedin,
      icon: <FaLinkedin />,
    },
    {
      label: "Portfolio",
      url: mediaSocial?.portfolio,
      icon: <FaGlobe />,
    },
    {
      label: "Facebook",
      url: mediaSocial?.facebook,
      icon: <FaFacebook />,
    },
    {
      label: "Instagram",
      url: mediaSocial?.instagram,
      icon: <FaInstagram />,
    },
  ].filter((item) => !!item.url);

  if (links.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "40px",
        bottom: "60px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            background: "#111",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: "22px",
            textDecoration: "none",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};