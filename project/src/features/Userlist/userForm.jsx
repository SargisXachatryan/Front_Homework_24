import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUserThunk, updateUserThunk } from "./userlist.slice"
import styles from "./userForm.module.css"

export const UserForm = ({ existingUser }) => {
  const [name, setName] = useState(existingUser ? existingUser.name : "")
  const [age, setAge] = useState(existingUser ? existingUser.age : "")
  const [salary, setSalary] = useState(existingUser ? existingUser.salary : "")
  
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = { name, age, salary }

    if (existingUser) {
      dispatch(updateUserThunk({ id: existingUser.id, updatedUser: user }))
    } else {
      dispatch(addUserThunk(user))
    }

    setName('')
    setAge('')
    setSalary('')
  }

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name)
      setAge(existingUser.age)
      setSalary(existingUser.salary)
    }
  }, [existingUser])

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        {existingUser ? "Update" : "Add"} User
      </button>
    </form>
  )
}
