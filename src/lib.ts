import { sendMessage } from "./bot";
import { config } from "./config";
import { getAllGroups } from "./db";
import { getLatestCommits } from "./github";
import { PushEvent, Repository } from "./types";

export const sendMultiplesCommits = async (repositoryUrl: string) => {
  const commits = await getLatestCommits(getRepositoryByName(repositoryUrl), 5);

  if (commits.length > 0) {
    const message = `Se han subido ${
      commits.length
    } nuevos commits al repositorio ${getRepositoryName(
      repositoryUrl
    )}:\n\n${commits.join("\n")}`;

    for (const user of config.users) {
      await sendMessage(user.id, message);
    }

    //   for (const group of config.groups) {
    //     await sendMessage(group.id, message);
    //   }
  }
};
export const sendlastCommit = async (commitEvent: PushEvent) => {
  console.log("commitEvent", commitEvent);

  const commitBranch = commitEvent.ref.replace("refs/heads/", "");

  const repo = getRepositoryByName(commitEvent.repository.html_url);
  const deployedUrl = repo.deployments[commitBranch];
  const deployedText = deployedUrl ? `\nDeployed: ${deployedUrl}` : "";
  const message = `Nuevo commit en ${
    commitEvent.repository.full_name
  }\nBranch: ${commitEvent.ref.replace(
    "refs/heads/",
    ""
  )}${deployedText}\nComment: ${commitEvent.head_commit.message}\nAuthor: ${
    commitEvent.head_commit.author.username
  }\nFecha: ${commitEvent.head_commit.timestamp}`;
  const groups = await getAllGroups();
  for (const user of config.users) {
    try {
      await sendMessage(user.id, message);
    } catch (error) {
      console.log(`Error sending mensaje to user ${user.id}`, error);
    }
  }

  for (const group of groups) {
    try {
      await sendMessage(group.chat_id, message);
    } catch (error) {
      console.log(`Error sending mensaje to group ${group.chat_id}`, error);
    }
  }
};
function getRepositoryByName(repositoryUrl: string): Repository | undefined {
  return config.repos.find((repo) => repo.url === repositoryUrl);
}

function getRepositoryName(repositoryUrl: string) {
  return getRepositoryByName(repositoryUrl)?.name || "";
}
