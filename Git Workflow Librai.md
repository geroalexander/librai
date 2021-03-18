# Librai

## Git Workflow

> This is a quick overview of how to commit, pull, push, and make sure our git workflow is stable and remains user-friendly

---

#### Contents

- Committing
- Branching
- Merging
- General Workflow

---

#### Committing

For this project we will be using Conventional Commits through Commitizen, giving us clean and readable commit messages. The package should already be installed. So you just need to save it as a global dependancy on your computer. Use `npm install commitizen -g`, if that doesn't work, add the `sudo` command infront of `npm`. This is the basic structure:

---

` <type>[optional scope]:<description>`

`feat(index.js): add button`

---

use the command `git cz` instead of `git commit -m`

The description should be written in the imperative, i.e. _add_ instead of _adds/added_

#### Branching

1. Create a branch

To branch, use the command `git checkout -b <branch-name>`.

Best practice is to make the branch name relevant to the feature or fix that is being implemented. i.e. `feat/login-button` or `fix/camera`.

2. Add the upstream

Use the command `git push -u origin HEAD` when on the working branch. Alternatively, HEAD can be replaced with the name of the branch (feat/login-button).

3. Commit using commitizen convention.
4. Run the command `git push`.

#### Merging

1. Checkout the development branch using `git checkout development` or any other working branch that you wish to merge the working branch into.
2. Git pull to update the branch before merging with working branch.
3. Run the command `git merge <other working branch>`.
4. Resolve any conflict.
5. Commit the changes using commitizen convention.

#### General Workflow

> There will be one main/master branch. This should be code that is ready to be shipped, all bugs fixed and resolved. This branch will run in parallel to the development branch, from which all branches will branch off.

main/master

development ---> branching off from here.
