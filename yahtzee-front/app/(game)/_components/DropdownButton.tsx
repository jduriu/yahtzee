export default function DropdownButton({buttonProps}) {

  const {buttonLabel, listObjects} = buttonProps

  return (
    <>
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
      font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
      type="button"
      data-dropdown-toggle="dropdown"
    >
      {buttonLabel}
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm">Bonnie Green</span>
          <span className="block text-sm font-medium text-gray-900 truncate">name@flowbite.com</span>
        </div>
        <ul className="py-1" aria-labelledby="dropdown">
          <li>
              <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
          </li>
          <li>
              <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Settings</a>
          </li>
          <li>
              <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Earnings</a>
          </li>
          <li>
              <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
          </li>
        </ul>
    </div>
    </>
  )
}
