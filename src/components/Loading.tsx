import {Spinner} from "@heroui/spinner";

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 flex h-full w-full justify-center items-center bg-black/50 z-50'>
      <Spinner size='lg' color='warning' className='scale-150' />
    </div>
  )
}

export default Loading;