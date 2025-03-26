import path from "path";
import ExifReader from "exifreader";
import fs from "fs"

const postsDirectory = path.join(process.cwd(), "public/images/");

export async function getPhotoData(id, dir, filename) {
  const filePath = path.join(postsDirectory, dir, id, filename);
  const res = await ExifReader.load(filePath);

  const newName = filename
    .split("-")
    .map(name => {
      const baseName = name.split(".")[0];
      return baseName.charAt(0).toUpperCase() + baseName.slice(1);
    })
    .join(" ");

  const photoInfo = {
    Camera: res["Model"]?.description,
    Lens: res["LensProfileName"]?.description.match(/\((.*?)(?= [A-Z0-9]{4,},)/)?.[1],
    ISO: res["ISOSpeedRatings"]?.description,
    Aperture: res["FNumber"]?.description,
    Shutter_Speed: res["ExposureTime"]?.description,
  };

  return {
    img: ["/images", dir, id, filename].join("/"),
    alt: newName,
    info: photoInfo,
  };
}

export async function getFilteredPhotos(id, dir, allowedFilenames = []) {
  const combDir = path.join(postsDirectory, dir, id);
  const photoNames = fs.readdirSync(combDir).filter(name => name.match(/\.(webp|jpg|jpeg)$/));
  // If allowedFilenames provided, filter based on that order
  const filtered = allowedFilenames.length
    ? allowedFilenames
    : photoNames.sort(); // sort alphabetically as a fallback
  return Promise.all(
    filtered.map(filename => getPhotoData(id, dir, filename))
  );
}