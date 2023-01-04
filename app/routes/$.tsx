export const loader = async () => {
  throw new Response(null, { status: 404 });
};
export default function () {
  return null;
}
