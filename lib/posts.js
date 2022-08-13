import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';


const postsDir = path.join(process.cwd(), 'posts');

export function getSortedPostData(){
    // 从目录中读取目录项
    const fileNames = fs.readdirSync(postsDir);
    const postsResult = fileNames.map((filename) => {
        // 去除markdown文件后缀名, 作为文件id
        const id = filename.replace(/\.md$/,'');

        // 读取文件
        const fullPath = path.join(postsDir,filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // 使用gray-matter库解析内容
        const matterResult = matter(fileContents);

        // 返回id和matterResult.data的结构体
        return {
            id,
            // data元素是gray-matter格式下markdown文档中的标头, 存储一些元数据
            // 该结构还包括content元素, 包括正文内容
            ...matterResult.data,
        }
    })
    // 对返回结果排序
    return postsResult.sort(({date:a},{date:b}) => {
        if (a<b){
            return 1;
        }
        else if (a>b){
            return -1;
        }
        else {
            return 0;
        }
    })
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDir);

    return fileNames.map((fileName) =>{
        return {
            params: {
                id: fileName.replace(/\.md$/,''),
            },
        };
    });
}

export async function getPostData(id){
    const fullPath = path.join(postsDir,`${id}.md`);
    const fileContents = fs.readFileSync(fullPath,'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };

    return{
        id,
        ...matterResult.data,
    }
}