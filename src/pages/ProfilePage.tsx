// Mariano Montini ('bosque', 'bosquestudio')
import { Profile } from "../components/Profile";

export function ProfilePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      <h1 className="text-3xl font-bold">👤 My 3 Word Pins</h1>
      <Profile />
    </div>
  );
}