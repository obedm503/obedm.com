import { createMemo, For, Show } from 'solid-js';
import { createQuery } from 'solid-urql';
import { Links } from '../components/links';

const posts: {
  title: string;
  repo?: string;
  url: string;
  nameWithOwner?: string;
  image: string;
  description: string;
}[] = [
  {
    title: 'nuffread.com',
    nameWithOwner: 'obedm503/nuffread',
    url: 'https://beta.nuffread.com/',
    repo: 'https://github.com/obedm503/nuffread',
    image: '/nuffread.webp',
    description: '',
  },
  {
    title: 'NCAI StudentAccess',
    nameWithOwner: 'ncai-developers/studentaccess',
    url: 'https://studentaccess.netlify.app/',
    repo: 'https://github.com/ncai-developers/studentaccess',
    image: '/studentaccess.png',
    description: 'NCAI student mobile client.',
  },
  {
    title: 'Engage for Equity Survey',
    description: 'Internal survey to evaluate community health.',
    image: '/e2-logo.png',
    url: 'https://survey.engageforequity.org/',
  },
  {
    title: 'obedm.com',
    nameWithOwner: 'obedm503/obedm.com',
    url: 'https://obedm.com/',
    repo: 'https://github.com/obedm503/obedm.com',
    image: '/obedm.png',
    description: '',
  },
  {
    title: 'microwiki',
    nameWithOwner: 'obedm503/microwiki',
    url: '',
    repo: 'https://github.com/obedm503/microwiki',
    image: '/micro-wiki.png',
    description: '',
  },
  {
    title: 'Virtual Memory Simulator',
    nameWithOwner: 'obedm503/vm-sim',
    url: '',
    repo: 'https://github.com/obedm503/vm-sim',
    image: '/linux-penguin.png',
    description: '',
  },
];

const REPOS = `
  fragment Repo on RepositoryConnection {
    nodes {
      createdAt
      description
      languages(first: 10) {
        nodes {
          id
          name
          color
        }
      }
      id
      nameWithOwner
      updatedAt
      pushedAt
      owner {
        id
      }
    }
  }

  query {
    organization(login: "ncai-developers") {
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER) {
        ...Repo
      }
    }
    repositoryOwner(login: "obedm503") {
      repositories(first: 100, privacy: PUBLIC) {
        ...Repo
      }
    }
  }
`;

export default function Index() {
  const [items] = createQuery({ query: REPOS });
  const repos = createMemo(() => {
    if (!items()) {
      return;
    }
    const allRepos = [
      ...items().repositoryOwner.repositories.nodes,
      ...items().organization.repositories.nodes,
    ];
    const map = {};
    for (const repo of allRepos) {
      map[repo.nameWithOwner] = repo;
    }
    return map;
  });

  return (
    <div>
      <div class="mt-32 mb-24 text-justify md:w-96 mx-auto">
        <h2 class="text-xl uppercase font-semibold">
          I'm <span class="text-primary">Obed Miranda</span>
        </h2>
        <h1 class="font-semibold text-3xl py-2">
          I architect and program user-facing systems.
        </h1>
        <p class="text-lg">
          Bootstrapping{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.apexhash.com"
            class="text-primary hover:text-blue-600 hover:underline"
          >
            ApexHash
          </a>{' '}
          and{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://beta.nuffread.com"
            class="text-primary hover:text-blue-600 hover:underline"
          >
            nuffread.com
          </a>
          .
        </p>

        <div class="pt-4">
          <Links />
        </div>
      </div>

      <h2 class="text-center p-4 text-2xl font-semibold pb-8">
        Open Source Projects
      </h2>

      <div class="space-y-4 md:space-y-0 md:grid gap-4 grid-cols-3">
        <For each={posts}>
          {item => {
            const repo = () => repos()?.[item.nameWithOwner];

            return (
              <div class="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out">
                <div class="h-36 p-4">
                  <Show when={item.image}>
                    <img
                      src={item.image}
                      alt={item.title}
                      class="mx-auto h-full"
                    />
                  </Show>
                </div>
                <div class="p-4">
                  <h2 class="text-xl font-semibold">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.url}
                      class="hover:text-primary flex items-center hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-[1em] w-[1em] mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {item.title}
                    </a>
                  </h2>

                  <Show when={item.repo}>
                    {repoUrl => (
                      <div class="text-md flex justify-start py-1">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={repoUrl}
                          class="flex items-center font-semibold text-primary hover:text-blue-600 hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-[1em] w-[1em] mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width={2}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          Source
                        </a>
                      </div>
                    )}
                  </Show>

                  <div class="flex flex-wrap mb-2">
                    {repo()?.languages.nodes.map(l => (
                      <span class="text-sm mx-1 flex items-center">
                        <svg
                          style={{ color: l.color }}
                          height="20"
                          width="20"
                          viewBox="0 0 16 16"
                          version="1.1"
                          class="inline-block fill-current mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8z"
                          ></path>
                        </svg>
                        {l.name}
                      </span>
                    ))}
                  </div>

                  <p>{item.description || repo()?.description}</p>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}