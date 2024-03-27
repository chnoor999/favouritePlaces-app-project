const GOOGLE_KEY = `AIzaSyCqE4NxpQT4sLNdLubD0vxD9LpuL1_gVPo`

export const getMapImage = async (cordinates) => {
  const res =
    await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${cordinates.lat},${cordinates.lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${cordinates.lat},${cordinates.lng}
    &key=${GOOGLE_KEY}`);

  return res.url;
};