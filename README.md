## Welcome to My GitHub Profile! 👋

Hello there! I'm a passionate technologist and a leader in the realm of cloud data platforms and platform engineering. My journey has been marked by a deep commitment to innovation, collaboration, and excellence in the field of technology. Here, you'll find a reflection of my work, my learnings, and the values that drive me.

### 🚀 About Me

- **Passionate Technologist**: My love for technology is not just about the tools and platforms; it's about how these can transform lives and industries. I've dedicated my career to mastering and contributing to cloud data platforms, believing in their power to revolutionize how we process, analyze, and leverage data.

- **Experienced Leader**: Leading by example, I've had the privilege of architecting cutting-edge platforms like Databricks, Snowflake, and Prefect. My leadership style is rooted in empathy, fostering a culture of innovation, and empowering teams to achieve their best.

- **Expert in Platform Engineering**: I believe in the power of end-to-end automation. From intake to onboarding, I've built DevOps pipelines that streamline processes, enhance efficiency, and drive continuous improvement. My expertise lies in creating seamless workflows that bridge the gap between development and operations, ensuring faster, more reliable delivery of applications.

### 🌟 My Ethos

- **Collaboration Over Competition**: I firmly believe that the best solutions come from working together. I'm always looking to collaborate with like-minded individuals and teams who are passionate about making a difference through technology.

- **Continuous Learning**: The tech landscape is ever-evolving, and so am I. I'm committed to learning and adapting, ensuring that my skills and knowledge are always at the cutting edge.

- **Making an Impact**: My goal is not just to innovate but to make a tangible impact. Whether it's through mentoring, building scalable solutions, or driving technological advancements, I strive to leave a positive mark on the industry and the community.

### 💡 Let's Connect

- **Ask Me About**: Cloud data platforms, platform engineering, DevOps, and how to lead successful tech teams.
- **How to Reach Me**: Feel free to reach out for collaborations, questions, or just to say hi. My inbox is always open.
- **Fun Fact**: Beyond the world of technology, I'm an avid reader and enjoy exploring the intersection of tech and philosophy.

#### 📫 Connect with Me

- **Website**: [https://siva.blog](https://siva.blog)
- **Email**: [hello@siva.blog](mailto:hello@siva.blog)

Feel free to reach out to me for collaborations, questions, or just to share your thoughts. I'm always open to connecting with fellow enthusiasts and professionals in the field!
Thank you for stopping by my profile. Let's explore the possibilities and make a difference together!

### 🗑️ GitHub Action Workflow for Deleting Branches

We have implemented a new GitHub action workflow to automatically delete branches that are already merged and have not been touched for 30 days. This helps in keeping the repository clean and manageable.

#### How to Configure and Use the Workflow

1. **Create the Workflow File**: Add a new file named `delete-branches.yaml` in the `.github/workflows` directory of your repository.
2. **Define the Schedule**: The workflow is set to run daily to check for branches that meet the criteria.
3. **Use GitHub Script**: The workflow uses `actions/github-script` to delete branches that are merged and not touched for 30 days.
4. **Log Unusable Branches**: The workflow will also log and state unusable branches.

By following these steps, you can ensure that your repository remains clean and free of stale branches.
