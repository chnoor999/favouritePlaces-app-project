const GOOGLE_KEY = `AIzaSyAC9ZoHMiIE-gDVLINysZHXLQ0di8JRne4`;

export const getMapImage = async (coordinates) => {
  const res =
    await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${coordinates.lat},${coordinates.lng}
    &key=${GOOGLE_KEY}`);

  return res.url;
};
