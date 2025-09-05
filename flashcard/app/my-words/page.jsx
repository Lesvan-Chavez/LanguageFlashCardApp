import MyWords from '../components/database/Userswords';

export default function MyWordsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-center text-4xl font-extrabold">My Words</h1>
      <MyWords targetLang="ES" />
    </main>
  );
}
