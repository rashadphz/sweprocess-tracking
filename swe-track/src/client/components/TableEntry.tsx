import React from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type EntryProps = {
  company: string
  status: string
  dateApplied: Date
}
const statusColors = new Map<string, string>([
  ['Offer', 'green'],
  ['Final Round', 'blue'],
  ['Interview Rounds', 'yellow'],
  ['Online Assesment', 'pink'],
  ['Applied', 'orange'],
  ['Not Applied', 'gray'],
  ['Rejected', 'red']
])

const capitalize = (s: string) => {
  return s
    .replace('_', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export default function TableEntry({
  userCompanyData: {
    company_id,
    user_id,
    company_name,
    user_status,
    date_applied
  }
}: any) {
  company_name = capitalize(company_name)
  user_status = capitalize(user_status)
  const bgColor: string = `bg-${statusColors.get(user_status)}-200`
  const textColor: string = `text-${statusColors.get(user_status)}-600`
  return (
    <tr className="text-black border-b border-gray-200 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">
      <td className="px-6 py-3 text-left whitespace-nowrap ">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="object-scale-down w-8 h-8"
              src={`//logo.clearbit.com/${company_name
                .replace(/\s+/g, '')
                .toLowerCase()}.com`}
            ></img>
          </div>
          <span className="font-medium">{company_name}</span>
        </div>
      </td>
      <td className="px-6 py-3 text-center">
        <span
          className={classNames(
            `${bgColor} ${textColor} font-bold py-1 px-2 rounded-md text-sm`
          )}
        >
          {capitalize(user_status)}
        </span>
      </td>
      <td className="px-6 py-3 text-left">
        <div className="flex items-center">
          <span>August 11, 2021</span>
        </div>
      </td>
      <td className="px-6 py-3 text-center">
        <div className="flex items-center justify-center">
          <span className="w-6 h-6 text-green-600 transform bg-green-200 rounded-full hover:scale-125">
            {' '}
            15{' '}
          </span>
          <span className="w-6 h-6 text-yellow-600 transform bg-yellow-200 rounded-full hover:scale-125">
            {' '}
            10{' '}
          </span>
          <span className="w-6 h-6 text-red-600 transform bg-red-200 rounded-full hover:scale-125">
            {' '}
            3{' '}
          </span>
          <span
            className={classNames(
              'text-gray-600 text-red-600 text-orange-600 text-yellow-600 text-green-600 text-blue-600 text-pink-600 text-gray-600, bg-red-200 bg-orange-200 bg-yellow-200 bg-green-200 bg-blue-200 bg-pink-200 bg-gray-200'
            )}
          />
        </div>
      </td>
    </tr>
  )
}
