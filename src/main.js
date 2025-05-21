import { Octokit } from "octokit";

const lightModeToggle = document.getElementById('light-toggle')
const darkModeToggle = document.getElementById('dark-toggle')

// Input elements
const userInput = document.getElementById('user-input')
const searchBtn = document.getElementById('search-btn')

// User info elements
const userAvatar = document.getElementById('user-avi')
const usernameSpan = document.getElementById('username')
const userIDSpan = document.getElementById('user-id')
const dateJoinedSpan = document.getElementById('date-joined')
const userBio = document.getElementById('bio')

// Stats elements
const userStatsRepos = document.getElementById('repos')
const userStatsFollowers = document.getElementById('followers')
const userStatsFollowing = document.getElementById('following')

// Socials elements
const userSocialsLocation = document.getElementById('location')
const userSocialsWebsite = document.getElementById('website')
const userSocialsTwitter = document.getElementById('twitter')
const userSocialsCompany = document.getElementById('company')


const apiKey = import.meta.env.VITE_IPIFY_KEY

const octokit = new Octokit({ 
    auth: apiKey
  });

async function getUser() {
    try {
        const response = await octokit.request('GET /users/{username}', {
            username: 'octocat',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching data", error)
    }
}

async function updateUser() {
    try {
        const data = await getUser()
        if (data) {
            // Set user info 
            userAvatar.src = data.avatar_url
            usernameSpan.textContent = data.name
            userIDSpan.textContent = data.login
            dateJoinedSpan.textContent = `Joined ${data.created_at}`
            if (data.bio) {
                userBio.textContent = data.bio
            } else {
                userBio.textContent = "This user has not written a bio yet."
            }

            // Set stats
            userStatsRepos.textContent = data.public_repos
            userStatsFollowers.textContent = data.followers
            userStatsFollowing.textContent = data.following

            // Set socials
            userSocialsCompany.textContent = data.company
            userSocialsLocation.textContent = data.location
            userSocialsTwitter.textContent = data.twitter_username
            userSocialsWebsite.textContent = data.html_url
        }
    } catch (error) {
        console.error('Error updating UI', error)  
    }
}

window.onload = async () => {
    await updateUser()
}
  
  