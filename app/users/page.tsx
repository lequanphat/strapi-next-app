
interface User{
    id: number;
    name:string;
}

const UsersPage = async () => {
const res = await fetch('https://jsonplaceholder.typicode.com/users', {next: {revalidate: 10}});
const users: User[] = await res.json();
     
  return (
    <div>
      <h1>users page</h1>
      <ul>
        {users.map((user: User) => <li key={user.id}>{user.id} - {user.name}</li>)}
      </ul>
    </div>
  )
}

export default UsersPage
