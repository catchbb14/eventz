# eventz




Branching process


Check which branch you're on `git branch`

Start on master branch, `git checkout master`

Do a `git pull` to get the latest copy of master

Create your new branch to code your story, `git checkout -b <branchname>`

Now you're on your own branch. Type `git branch` to see you're on your new branch.

Now write your code.

Once you're code is done for the story you're working on, add it to your branch and commit it.

Type `git status` to see the status of the files you've worked on. (these should be red, because you havent added them yet)

To do this, do a `git add .` to add all files.

Type `git status` again, you will now see the files are green, which indicates they have been added to your branch.

Now make your commit message that says what you did. `git commit -m "your commit message here"`

Next, push your code up to the repository, with a `git push origin <branchname>`

Once your branch is pushed up, navigate to our repo, and you can see your pull request. Add reviewers to the pull request, and Create Pull Request.