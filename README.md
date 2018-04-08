# eventz






###Branching process (this is how we create individual branches and push up to github)


1. Check which branch you're on `git branch`

2. Start on master branch, `git checkout master`

3. Do a `git pull` to get the latest copy of master

4. Create your new branch to code your story, `git checkout -b <branchname>`

5. Now you're on your own branch. Type `git branch` to see you're on your new branch.

6. Now write your code.

7. Once you're code is done for the story you're working on, add it to your branch and commit it.

8. Type `git status` to see the status of the files you've worked on. (these should be red, because you havent added them yet)

9. To do this, do a `git add .` to add all files.

10. Type `git status` again, you will now see the files are green, which indicates they have been added to your branch.

11. Now make your commit message that says what you did. `git commit -m "your commit message here"`

12. Next, push your code up to the repository, with a `git push origin <branchname>`

13. Once your branch is pushed up, navigate to our repo, and you can see branch under "Your recently pushed branches:". Click on Compare & pull request.

14. On the right hand side, add reviewers to review your pull request. Then click "Create Pull Request"