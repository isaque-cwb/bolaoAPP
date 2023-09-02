import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatar from '../assets/avatares.png'
import checkImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'
import { InferGetStaticPropsType, GetStaticProps, GetServerSideProps } from 'next'



interface HomeProps {
  poolsCount: number;
  guessesCount: number;
  userCount: number
}



export default function Home({ poolsCount, guessesCount, userCount }: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')



  async function createPool(event: FormEvent) {
    event.preventDefault()
    await api.post('/pools', {
      title: poolTitle
    }).then(async (response) => {
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      setPoolTitle('')
      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência.')
    }).catch(error => {
      console.log(error)
      alert('Falha ao criar o bolão, tente novamente')
    })


  }

  return (

    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'  >
      <main>
        <Image
          src={logoImg}
          alt="NLW Copa"
          quality={100}
        />
        <h1 className='mt-14 text-white text-5xl  leading-tight ' >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className='mt-10 flex items-center gap-2  ' >
          <Image src={usersAvatar} alt='avatares pequenos agrupados' />

          <strong className='text-gray-100 text-xl' >
            <span className='text-ignite-500  '>+{userCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className=' mt-10 flex gap-2' >
          <input className='flex-1 px-6 py-4 rounded text-white bg-gray-800 border border-gray-600 text-sm'
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            onChange={event => { setPoolTitle(event.target.value) }}
            value={poolTitle}
          />
          <button
            className='bg-yellow-500 px-6 py-4 rounded
             text-gray-900 font-bold text-sm uppercase
              hover:bg-yellow-700 transition ease-in-out hover:scale-105 duration-300 delay-200'
            type='submit' >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed '
        >Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100' >
          <div className='flex items-center gap-6'>
            <Image src={checkImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolsCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600' />
          <div className='flex items-center gap-6'>
            <Image src={checkImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="imagem de celulares prévia da aplicação"
        quality={100}
      />
    </div>

  )
}



export const getServerSideProps: GetServerSideProps = async () => {


  const [poolsCountResponse, poolsGuessesResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: poolsGuessesResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}
