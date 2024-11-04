import { useState } from 'react'

import { Header } from '../../components/Header'
import background from '../../assets/background.png'
import { ItemList } from '../../components/ItemList'
import './styles.css'

const App = () => {
    const [user, setUser] = useState('')
    const [currentUser, setCurrentUser] = useState([])
    const [repositories, setRepositories] = useState([])

    const handleGetDate = async () => {
        const userData = await fetch(`https://api.github.com/users/${user}`)
        const newUser = await userData.json()

        if (newUser.name) {
            const { avatar_url, name, bio, login } = newUser
            setCurrentUser({ avatar_url, name, bio, login })

            const reposData = await fetch(
                `https://api.github.com/users/${user}/repos`
            )
            const newRepos = await reposData.json()

            if (newRepos.length) {
                setRepositories(newRepos)
            }
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="content">
                <img
                    className="background"
                    alt="Background app"
                    src={background}
                />
                <div className="info">
                    <div>
                        <input
                            type="text"
                            name="user"
                            placeholder="@username"
                            value={user}
                            onChange={(event) => setUser(event.target.value)}
                        />

                        <button onClick={handleGetDate}>Buscar</button>
                    </div>

                    {currentUser?.name && (
                        <div className="profile">
                            <img
                                className="profile-img"
                                src={currentUser.avatar_url}
                                alt="Profile"
                            />
                            <div>
                                <h3>{currentUser.name}</h3>
                                <span>@{currentUser.login}</span>
                                <p>{currentUser.bio}</p>
                            </div>
                        </div>
                    )}
                    <hr />
                    {repositories?.length > 0 && (
                        <div>
                            <h4 className="repo">Repositórios</h4>

                            {repositories.map((repo) => (
                                <ItemList
                                    key={repo.id}
                                    title={repo.name}
                                    description={repo.description}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
