export default function DropdownButton({ selectedCategory, dropdownProps }) {
  const { buttonLabel, categories } = dropdownProps

  return (
    <>
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
      font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
      type="button"
      data-dropdown-toggle="dropdown"
    >
      {buttonLabel}
    </button>
    <div className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm">Bonnie Green</span>
          <span className="block text-sm font-medium text-gray-900 truncate">name@flowbite.com</span>
        </div>
        <ul className="py-1" aria-labelledby="dropdown">
          <li>
            <a>{selectedCategory}</a>
          </li>
          {Object.entries(categories).map((name, set) =>
            <li key={name} onClick={() => set}>
              <a>{name}</a>
            </li>
          )}
        </ul>
    </div>
    </>
  )
}
