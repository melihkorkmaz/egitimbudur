type User = {
  email: string;
  password: string;
}

export const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData) as User;
    // Save user
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>E-Mail</label>
        <input name="email" type="email" />
      </div>

      <div className="form-group">
        <label>Sifre</label>
        <input name="password" />
      </div>

      <button type="submit">Kaydet</button>
    </form>
  );
};