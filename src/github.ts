import { Octokit } from "@octokit/rest";
import { CommitInfo, Repository } from "./types";

// Crear una instancia de Octokit y autenticar con un token de acceso personal de Github
const octokit = new Octokit({
  auth: "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",
});

export async function getLastCommit(
  repository?: Repository
): Promise<CommitInfo> {
  // Obtener los últimos commits del repositorio
  const { data: commits } = await octokit.repos.listCommits({
    owner: repository.owner,
    repo: repository.name,
  });

  // Obtener el último commit
  const lastCommit = commits[0];
  console.log("lastCommit", lastCommit);

  // Crear un objeto con el mensaje y la fecha del último commit
  const commitInfo: CommitInfo = {
    message: lastCommit.commit.message,
    date: lastCommit.commit.author?.date,
    author: lastCommit.commit.author?.name,
  };

  // Devolver el objeto con la información del último commit
  return commitInfo;
}

export async function getLatestCommits(
  repository?: Repository,
  count?: number
): Promise<string[]> {
  if (!repository) {
    return [];
  }
  const response = await octokit.repos.listCommits({
    owner: repository.owner,
    repo: repository.name,
    per_page: count,
  });

  return response.data.map((commit) => commit.commit.message);
}
