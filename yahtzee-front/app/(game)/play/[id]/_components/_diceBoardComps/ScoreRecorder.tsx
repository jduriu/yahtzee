import DropdownButton from "@/app/(game)/_components/DropdownButton";
import { useState } from 'react'


export default function ScoreRecorder({scorecard}) {
  const [selectedCategory, setSelectedCategory] = useState('Select a Category')
  console.log(scorecard)
  const getCategories = () => {
    const availableCategories = [
      "ones": {
        name: "Ones",
        setter: () => setSelectedCategory('ones'),
      },
      "twos": () => selectedCategory('twos'),
      "threes": () => selectedCategory('threes'),
      "fours": () => selectedCategory('fours'),
      "fives": () => selectedCategory('fives'),
      "sixes": () => selectedCategory('sixes'),
      "three_of_kind": () => selectedCategory('three_of_kind'),
      "full_house": () => selectedCategory('full_house'),
      "sm_straight": () => selectedCategory('sm_straight'),
      "lg_straight": () => selectedCategory('lg_straight'),
      "yahtzee": () => selectedCategory('yahtzee'),
      "chance": () => selectedCategory('chance'),

  ]
    if (scorecard.scored) {
      for (let category of scorecard.scored) {
        delete availableCategories.category
      }
    }
    return availableCategories
  }


  const dropdownProps: DropdownProps = {
    buttonLabel: "Select",
    categories: getCategories()
  }

  return (
    <div>
      <div>Score Recorder</div>
      <div>Record</div>
      <DropdownButton selectedCategory={selectedCategory} dropdownProps={dropdownProps}/>
    </div>
  )
}
