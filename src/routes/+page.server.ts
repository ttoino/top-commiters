import type { PageServerLoad } from "./$types";
// import { App } from "octokit";

// const app = new App({
//     appId: 338168,
//     privateKey: "",
// });

// const octokit = await app.getInstallationOctokit(37863009);

// interface Search {
//     search: {
//         userCount: number;
//         nodes: {
//             name: string;
//             avatarUrl: string;
//             url: string;
//             contributionsCollection: {
//                 totalCommitContributions: number;
//                 totalIssueContributions: number;
//                 totalPullRequestContributions: number;
//                 totalPullRequestReviewContributions: number;
//             };
//             followers: {
//                 totalCount: number;
//             };
//         }[];
//     };
// }

export const load: PageServerLoad = async () => {
    // const search = await octokit.graphql<Search>(
    //     `
    //         query {
    //             search(query: "location:portugal", type: USER, first: 25) {
    //                 userCount
    //                 nodes {
    //                     ... on User {
    //                         name
    //                         avatarUrl
    //                         url
    //                         followers {
    //                             totalCount
    //                         }
    //                         contributionsCollection {
    //                             totalCommitContributions
    //                             totalIssueContributions
    //                             totalPullRequestContributions
    //                             totalPullRequestReviewContributions
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     `
    // );

    // const users = search.search.nodes.map((u) => ({
    //     name: u.name,
    //     avatarUrl: u.avatarUrl,
    //     url: u.url,
    //     commits: u.contributionsCollection.totalCommitContributions,
    //     issues: u.contributionsCollection.totalIssueContributions,
    //     prs: u.contributionsCollection.totalPullRequestContributions,
    //     reviews: u.contributionsCollection.totalPullRequestReviewContributions,
    //     total:
    //         u.contributionsCollection.totalCommitContributions +
    //         u.contributionsCollection.totalIssueContributions +
    //         u.contributionsCollection.totalPullRequestContributions +
    //         u.contributionsCollection.totalPullRequestReviewContributions,
    //     followers: u.followers.totalCount,
    // }));

    // console.log(JSON.stringify(users, null, 2));

    // return { users };

    return JSON.parse(`
{
    "users": [
        {
            "name": "Jonas Schmedtmann",
            "avatarUrl": "https://avatars.githubusercontent.com/u/18718850?u=9e3b84d1871a03690c758df5b5e9b967223a6def&v=4",
            "url": "https://github.com/jonasschmedtmann",
            "commits": 3,
            "issues": 0,
            "prs": 2,
            "reviews": 0,
            "total": 5,
            "followers": 17632
        },
        {
            "name": "José Moreira",
            "avatarUrl": "https://avatars.githubusercontent.com/u/3604053?u=d1fe198629ce2efb587438237749f22ee93bbafe&v=4",
            "url": "https://github.com/cusspvz",
            "commits": 10,
            "issues": 4,
            "prs": 4,
            "reviews": 0,
            "total": 18,
            "followers": 7844
        },
        {
            "name": "Manoela Ilic",
            "avatarUrl": "https://avatars.githubusercontent.com/u/1044196?v=4",
            "url": "https://github.com/crnacura",
            "commits": 103,
            "issues": 0,
            "prs": 0,
            "reviews": 0,
            "total": 103,
            "followers": 6637
        },
        {
            "name": "Nuno Maduro",
            "avatarUrl": "https://avatars.githubusercontent.com/u/5457236?u=14bce3a88b4b23afce80183fc57f095149570b26&v=4",
            "url": "https://github.com/nunomaduro",
            "commits": 2045,
            "issues": 13,
            "prs": 279,
            "reviews": 130,
            "total": 2467,
            "followers": 5523
        },
        {
            "name": "Bruno Rocha",
            "avatarUrl": "https://avatars.githubusercontent.com/u/458654?u=1c0ef93b4cde3bb627789646b7afd2dbe543de93&v=4",
            "url": "https://github.com/rochacbruno",
            "commits": 309,
            "issues": 23,
            "prs": 87,
            "reviews": 117,
            "total": 536,
            "followers": 3960
        },
        {
            "name": "Nelson",
            "avatarUrl": "https://avatars.githubusercontent.com/u/194400?u=405fb897c18f414ea8c4f4f2613fbef605855f02&v=4",
            "url": "https://github.com/nelsonic",
            "commits": 2966,
            "issues": 752,
            "prs": 73,
            "reviews": 1884,
            "total": 5675,
            "followers": 3356
        },
        {
            "name": "Miguel Piedrafita",
            "avatarUrl": "https://avatars.githubusercontent.com/u/23558090?u=8033dca78038cf5ea97779318407f3408d181430&v=4",
            "url": "https://github.com/m1guelpf",
            "commits": 580,
            "issues": 9,
            "prs": 119,
            "reviews": 84,
            "total": 792,
            "followers": 2561
        },
        {
            "name": "Bruno Casanova",
            "avatarUrl": "https://avatars.githubusercontent.com/u/4107768?v=4",
            "url": "https://github.com/brunocasanova",
            "commits": 0,
            "issues": 0,
            "prs": 0,
            "reviews": 0,
            "total": 0,
            "followers": 2385
        },
        {
            "name": "pedro ubuntu",
            "avatarUrl": "https://avatars.githubusercontent.com/u/23490060?u=206a5bae4117809b75f06dd2052d1948b928361b&v=4",
            "url": "https://github.com/r00t-3xp10it",
            "commits": 1531,
            "issues": 0,
            "prs": 0,
            "reviews": 0,
            "total": 1531,
            "followers": 1971
        },
        {
            "name": "Claudson Oliveira",
            "avatarUrl": "https://avatars.githubusercontent.com/u/94096?u=03057b1368d7eee609266689d6f737267c9ef98e&v=4",
            "url": "https://github.com/filhodanuvem",
            "commits": 22,
            "issues": 5,
            "prs": 5,
            "reviews": 0,
            "total": 32,
            "followers": 1931
        },
        {
            "name": "snipe",
            "avatarUrl": "https://avatars.githubusercontent.com/u/197404?u=3a3faa7eb52d0ccb5d757cab2633677328bbffb2&v=4",
            "url": "https://github.com/snipe",
            "commits": 2083,
            "issues": 3,
            "prs": 340,
            "reviews": 68,
            "total": 2494,
            "followers": 1732
        },
        {
            "name": "Vasco Asturiano",
            "avatarUrl": "https://avatars.githubusercontent.com/u/6784226?u=36b61db7588e94f64ae8b11a7ba8091149b9eff0&v=4",
            "url": "https://github.com/vasturiano",
            "commits": 768,
            "issues": 0,
            "prs": 11,
            "reviews": 8,
            "total": 787,
            "followers": 1559
        },
        {
            "name": "SimCoder",
            "avatarUrl": "https://avatars.githubusercontent.com/u/30011307?u=72cc8b1c50acd84ad2105642162665fd6ebe2553&v=4",
            "url": "https://github.com/SimCoderYoutube",
            "commits": 0,
            "issues": 0,
            "prs": 0,
            "reviews": 0,
            "total": 0,
            "followers": 1518
        },
        {
            "name": "fG!",
            "avatarUrl": "https://avatars.githubusercontent.com/u/859134?u=2f7962ffc0815071a999ccfab100adc4d7a20c2d&v=4",
            "url": "https://github.com/gdbinit",
            "commits": 109,
            "issues": 3,
            "prs": 2,
            "reviews": 0,
            "total": 114,
            "followers": 1435
        },
        {
            "name": "Paulo Gonçalves",
            "avatarUrl": "https://avatars.githubusercontent.com/u/29241659?u=b31785c96e4b167fc6020b90dd6f217afd897c9d&v=4",
            "url": "https://github.com/PauloGoncalvesBH",
            "commits": 108,
            "issues": 9,
            "prs": 26,
            "reviews": 7,
            "total": 150,
            "followers": 1317
        },
        {
            "name": "David Dias",
            "avatarUrl": "https://avatars.githubusercontent.com/u/1211152?u=37a4fcc17ba638f86e27b17655c54e9193fe2782&v=4",
            "url": "https://github.com/daviddias",
            "commits": 0,
            "issues": 0,
            "prs": 0,
            "reviews": 1,
            "total": 1,
            "followers": 1193
        },
        {
            "name": "Pedro Nogueira",
            "avatarUrl": "https://avatars.githubusercontent.com/u/57453260?u=e2494edb56a9a145a9a40e41c7ca1c351c79859c&v=4",
            "url": "https://github.com/Pedromdsn",
            "commits": 67,
            "issues": 14,
            "prs": 7,
            "reviews": 0,
            "total": 88,
            "followers": 1115
        },
        {
            "name": "Otávio Santana",
            "avatarUrl": "https://avatars.githubusercontent.com/u/863011?u=56465da918ab3e1ffdd707eade89d36032082a21&v=4",
            "url": "https://github.com/otaviojava",
            "commits": 5251,
            "issues": 68,
            "prs": 169,
            "reviews": 87,
            "total": 5575,
            "followers": 1034
        },
        {
            "name": "Daniel Vaz Gaspar",
            "avatarUrl": "https://avatars.githubusercontent.com/u/4025227?u=baab56022cb77c91dd55a2d523568f2614a35605&v=4",
            "url": "https://github.com/dpgaspar",
            "commits": 129,
            "issues": 1,
            "prs": 131,
            "reviews": 161,
            "total": 422,
            "followers": 1033
        },
        {
            "name": "Cleidiana Barbosa ",
            "avatarUrl": "https://avatars.githubusercontent.com/u/84573782?u=05dc28d5d7586eb7d35960a496dfb3387fc40cd2&v=4",
            "url": "https://github.com/Cleidianaa",
            "commits": 111,
            "issues": 0,
            "prs": 5,
            "reviews": 0,
            "total": 116,
            "followers": 1025
        },
        {
            "name": "Pedro Teixeira",
            "avatarUrl": "https://avatars.githubusercontent.com/u/47910?u=b8b2d1fdde96ba754b208e7be57c0cf89beea527&v=4",
            "url": "https://github.com/pgte",
            "commits": 3,
            "issues": 3,
            "prs": 0,
            "reviews": 0,
            "total": 6,
            "followers": 993
        },
        {
            "name": "Francisco Franco",
            "avatarUrl": "https://avatars.githubusercontent.com/u/792248?u=03b2bd978df9ae613b87a19e7a79892d76b128a1&v=4",
            "url": "https://github.com/franciscofranco",
            "commits": 2,
            "issues": 0,
            "prs": 2,
            "reviews": 0,
            "total": 4,
            "followers": 957
        },
        {
            "name": "Elizabet Oliveira",
            "avatarUrl": "https://avatars.githubusercontent.com/u/2750668?u=ce722357ae563c0d9b7e0316bf9e8402d514640a&v=4",
            "url": "https://github.com/miukimiu",
            "commits": 78,
            "issues": 11,
            "prs": 69,
            "reviews": 93,
            "total": 251,
            "followers": 920
        },
        {
            "name": "Orne Brocaar",
            "avatarUrl": "https://avatars.githubusercontent.com/u/165497?u=93ed22c26e46fb293b5ecdf9c35a9412d0e4ace7&v=4",
            "url": "https://github.com/brocaar",
            "commits": 736,
            "issues": 4,
            "prs": 3,
            "reviews": 6,
            "total": 749,
            "followers": 909
        },
        {
            "name": "lisbon",
            "avatarUrl": "https://avatars.githubusercontent.com/u/16432726?u=5c7fdfc451d68aa6939a98a17168697c0b2b4d0c&v=4",
            "url": "https://github.com/honeydatax",
            "commits": 0,
            "issues": 0,
            "prs": 0,
            "reviews": 0,
            "total": 0,
            "followers": 864
        }
    ]
}
    `)
};
