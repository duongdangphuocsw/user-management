import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const SelectSort = (props) => {
  const users = useSelector(state=> state.user.users)
  const dispatch = useDispatch()
  const [sort, setSort] = useState("sdf");
  // useEffect(() => {
  // 

  //   if(sort !== "") {
  //     switch (sort) {
  //       case "newestToOldest":
  //     handleSortNestestToOldest()
  //         break;
  //     case "oldestToNewest":
  //     handleSortOldestToNestest()
  //       break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [sort]);
    const handleChange = (e) => {
      // setSort(e.target.value)
        switch (e.target.value) {
          case "newestToOldest":
        handleSortNestestToOldest(e)
            break;
        case "oldestToNewest":
        handleSortOldestToNestest(e)
          break;
          default:
            break;
        }
    }
    const handleSortNestestToOldest = (e) => {
      const sortedUsers = users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      dispatch({
        type: "SORT_NEWEST_TO_OLDEST",
        payload: {usersSort: sortedUsers, typeSort: e.target.value}
      })
    }
    const handleSortOldestToNestest = (e) => {
      const sortedUsers = users.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      
      dispatch({
        type: "SORT_OLDEST_TO_NEWEST",
        payload: {usersSort: sortedUsers, typeSort: e.target.value}
      })
    }
    return(
        <div className="selectSortUsers__container">
        <select  defaultValue="DEFAULT" onChange={handleChange}>
          <option value="DEFAULT"  disabled="disabled" >Select sort</option>
          <option value="newestToOldest">Newest to oldest</option>
          <option value="oldestToNewest">Oldest to newest</option>
        </select>
      </div>
    )
}
export default SelectSort