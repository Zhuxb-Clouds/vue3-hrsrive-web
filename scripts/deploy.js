import simpleGit from 'simple-git';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const git = simpleGit();

// 替换为你的本地文件夹路径和 GitHub 仓库 URL
const localFolderPath = path.resolve(__dirname, '../dist');
const remoteRepoUrl = "https://github.com/Zhuxb-Clouds/hrsrive.cn.git";
const branchName = "main"; // 替换为你的分支名称

async function pushToGitHub() {
  try {
    // 进入本地文件夹
    process.chdir(localFolderPath);
    fs.writeFileSync("CNAME", "hrsrive.cn", "utf8");
    // 初始化 git 仓库（如果没有初始化的话）
    await git.init();

    // 设置远程仓库
    // await git.addRemote("origin", remoteRepoUrl);

    // 添加所有文件
    await git.add("./*");

    // 提交更改
    await git.commit("Automated commit message");

    // 强制推送到远程仓库
    await git.push("origin", branchName, { "--force": true });

    console.log("推送成功!");
  } catch (error) {
    console.error("推送失败 ", error.message);
  }
}

pushToGitHub();
