import FeedPage from './feed/page';

export default function Home() {
  return <FeedPage searchParams={{
    page: undefined
  }} />;
}