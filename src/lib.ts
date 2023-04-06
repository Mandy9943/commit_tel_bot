import { sendMessage } from "./bot";
import { config } from "./config";
import { getAllGroups } from "./db";
import { getLastCommit, getLatestCommits } from "./github";
import { Repository } from "./types";

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
export const sendlastCommit = async (repositoryUrl: string) => {
  const repository = getRepositoryByName(repositoryUrl);
  const lastCommitInfo = await getLastCommit(repository);
  const message = `Nuevo commit en ${repository.name}\nComment: ${lastCommitInfo.message}\nFecha: ${lastCommitInfo.date}`;
  const groups = await getAllGroups();
  for (const user of config.users) {
    await sendMessage(user.id, message);
  }

  for (const group of groups) {
    await sendMessage(group.chat_id, message);
  }
};
function getRepositoryByName(repositoryUrl: string): Repository | undefined {
  return config.repos.find((repo) => repo.url === repositoryUrl);
}

function getRepositoryName(repositoryUrl: string) {
  return getRepositoryByName(repositoryUrl)?.name || "";
}
