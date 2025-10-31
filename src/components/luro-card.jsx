export default function LuroCard() {
  const luros = [
    { id: "Fox", imgSrc: "/Pixel Art Fox in Focus.png", altText: "Fox luro" },
    { id: "Otter", imgSrc: "/Pixel Art Otter Creature.png", altText: "Otter luro" },
    { id: "Phoenix", imgSrc: "/Pixelated Phoenix with Flames.png", altText: "Phoenix luro" }
  ];

  return (
    <>
      {luros.map(luro => (
        <div className="luro-item" id={luro.id} key={luro.id}>
          <a href="coursepage.html#">
            <img src={luro.imgSrc} alt={luro.altText} />
          </a>
        </div>
      ))}
    </>
  );
}
