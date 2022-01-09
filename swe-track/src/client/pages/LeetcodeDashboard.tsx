import { useEffect, useState } from 'react'
import Table from '../components/Leetcode/Table'
import TableEntry from '../components/Leetcode/TableEntry'
import axios from 'axios'
import AddProblemModal from '../components/Leetcode/AddProblemModal'
import FilterDifficulty from '../components/Leetcode/FilterDifficulty'
import FilterTag from '../components/Leetcode/FilterTag'
import CurrentFiltersSpan from '../components/Leetcode/CurrentFiltersSpan'

type EntryProps = {
  lid: number
  title: string
  difficulty: string
  user_leetcode: {
    uid: number
    date_solved: Date
  }[]
  leetcode_tags: {
    tag: {
      tid: number
      tag_name: string
      color: string
      alias: string
    }
  }[]
}
type TagProp = {
  tid: number
  tag_name: string
  alias: string
  color: string
}

export default function LeetcodeDashboard({ userData, setUserData }: any) {
  const [problems, setProblems] = useState([])
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([])
  const [tagFilter, setTagFilter] = useState<TagProp[]>([])

  useEffect(() => {
    getUserLeetcode(userData.uid)
  }, [userData, difficultyFilter, tagFilter])

  const getUserLeetcode = async (uid: number) => {
    const difficultyParam = difficultyFilter
      .map(difficulty => `difficulty=${difficulty}`)
      .join('&')
    const tagParam = tagFilter.map(tag => `tag=${tag.tid}`).join('&')
    const response = await axios.get(
      `http://localhost:8080/userleetcode/id/${uid}?${difficultyParam}&${tagParam}`
    )
    const data = response.data
    const userLeetcode = data.map((entry: EntryProps) => (
      <TableEntry userLeetcodeData={entry} setUserData={setUserData} />
    ))
    setProblems(userLeetcode)
  }
  return (
    <div className="mt-20 overflow-x-auto">
      <div className="flex justify-center min-h-screen overflow-hidden font-sans min-w-screen bg-white-400">
        <div className="w-full lg:w-5/6">
          <div className="inline-flex justify-between w-full">
            <h3 className="text-left ml-3 text-4xl font-[Oceanwide] dark:text-white">
              Hello {userData.full_name}!
            </h3>
            <div className="inline-flex">
              <AddProblemModal userData={userData} setUserData={setUserData} />
              <FilterDifficulty
                filter={difficultyFilter}
                setFilter={setDifficultyFilter}
              />
              <FilterTag filter={tagFilter} setFilter={setTagFilter} />
            </div>
          </div>
          <div className="mt-3 w-full inline-flex flex-row-reverse">
            <CurrentFiltersSpan
              tagFilter={tagFilter}
              setTagFilter={setTagFilter}
              difficultyFilter={difficultyFilter}
              setDifficultyFilter={setDifficultyFilter}
            />
          </div>
          <Table entries={problems}></Table>
        </div>
      </div>
    </div>
  )
}
