export default function Page(): React.ReactElement {
  return (
    <>
      <h1>Create Tips</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <label>
          Upload Image:
          <input type="file" name="image" />
        </label>
        <label>
          HTML Content:
          <textarea name="htmlContent"></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}