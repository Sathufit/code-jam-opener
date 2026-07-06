const BOOKLET_URL =
  "https://drive.google.com/drive/folders/1TBpxltX86vK-GEXgZJx1gPJV9IKbK-DE?usp=sharing";

export function GET() {
  return Response.redirect(BOOKLET_URL, 307);
}
