import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchUsers, removeUserThunk } from "./userlist.slice"
import styles from "./userlist.module.css"
import { UserForm } from "./userForm"

export const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const isLoading = useSelector((state) => state.users.isLoading)
  
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleEdit = (user) => {
    setSelectedUser(user)
  }

  if (isLoading) return <div><img src="https://media.tenor.com/jfmI0j5FcpAAAAAM/loading-wtf.gif" alt="Loading...." /></div>

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
        <UserForm existingUser={selectedUser} />
      </div>

      <div className={styles.tableContainer}>
        <h2>User List</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.salary}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => dispatch(removeUserThunk(user.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
