import { useRouter } from 'next/router'
import Header from '../components/Header'
import TitlePage from '../components/TitlePage'

export default function Writeup() {
  const router = useRouter()
  return (
    <div>
        <Header />
        <TitlePage>
            <h1>Post {router.query.id}</h1>
        </TitlePage>
    </div>
  );
}