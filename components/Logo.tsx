import Link from 'next/link'

export function Logo(props: { size?: string }) {
  return (
    <Link
      className={`shadow-md bg-primary uppercase font-bold text-white mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40 ${props.size}`}
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      title='Logo COOK MATE'
      href='/'
    >
      Cook Mate
    </Link>
  )
}
