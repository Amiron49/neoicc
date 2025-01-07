<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	const commits = [
		'b36b009f6ad45abfc79df9717e81a0238ca00163',
		'22bf04a2926a9a73df79cf00c3423dd8a5b72fdf',
		'a33ccd3d4fc7cd6474f29a637ace8246d1a2356b',
		'8abd219403d43ab0b5f340aa53dc8c2f26ceacff',
		'75a5f36c254fea56a676d9fe40031aceb67014d6',
		'153e00c7d477252ce9aa1217cb973d455346c63d',
		'e2251e947ab8b1d44914dc3a5c625cd0f657c76e',
		'b4751f946795824f9c8422c04bb186e9669756a4',
		'98563091011bf83442913edb8e732098d7e3d628',
		'4023806f8c615416693a2096cde5443dd3c11fb8',
		'92337835e41b02fe7cabcd188cfd0e34e367463c',
		'b138d5c0f40339b381eead0aca7787c19023cbe0',
		'62589edced34884dfd182e3e4207e6726633aef1',
		'99db75f29b09bf898d241e2c8cade65966fb1fcf',
		'fb9fbf728103917e5acf846237dfffc6b2cda53f',
		'aaed00f8edb0985a158cd817e3d2493be229d6fb',
		'ed8e6752fbdd7580720cea1b028121da4b89d485',
		'506efaae02ae678ec55b576c9d2a51550fcd79be',
		'31b4219e6036c748a538cfdc18c684d1dad94a3c',
		'740426c60471893ebb16ef703a41eb9649635a9c',
		'9afc904133414583ab61089848a8445e3931e0cb',
		'b04deb17acc4e6856d1436de4ab888845b57507e',
		'45d673bbb1f603e6e0e3a0083ba44405a3e88c36',
		'c3b17b2bc70f71e5b0f048304274282202d6889b',
		'c824148566cab3a221883211ed33158d1b691b5a',
		'1da6ea6083f42c3de06181ef0576e483404bd1f2',
		'68213ed42700db08749be7295965ce3831c69e62',
		'228e2e5d3c53e266ead94bf8a55af6f09380bb3b',
		'ca51a454574320d185b58771c5ead21147135d0b',
		'26574ce1d7fed75858e573ffd83a018de264b8bc',
		'146009f0223c689e28c6ae498d0d940fd1fc8a4f',
		'679e64eaacdf7b638c5c61a83ef9eb878eafbd3a',
		'933c2a99330c2f220e7ba0dfab660246ea11fe8d',
		'ebd164c235285c7b30ff6d099b9e710b34cc519a',
		'80aa1220ee32d04c93c1b0978539c7b321f5a3f6',
		'233c10481d0bbfff2ec8055368296af89e9af2dc',
		'fe89e1b581e87a5b1b1fbfac7b8c63debfa2a8f9',
		'77af69da81ea409a3010b690da8ab3f943629c51',
		'389d5a8669039e30bf69d9e4c3931bb52cacd5f4',
		'645f289c2e44f8487a01996d7bfa8ea554d5eb10',
		'c953d9878f9375f79c8a5d97aba347f06c7dc060',
		'2ce12ea3db478338763252bcbe98cd94b82b85d8',
		'c0424e0b2756becaccf0f61801c1956b2488a845',
		'd1d7095fa0c0f4a188f4b0f43bd40cce9866e198',
		'c46d71064fbab39021857671db7935e65b558582',
		'd09f0cde88c70b7bf428b6cbe11125da0598d560',
		'3422bb16c9a7fd454d3364e49157b9d03a6c7e76',
		'd013c586947008bf5c3d8b323e2b34e3d73adf47',
		'6270c074069719f3b38121855267032b09483e7b',
		'deae4c5ffb48a2c0134b50109192fb17c1818b9f',
		'4b146056251adcc97e0fe8521cf68e739b367071',
		'532a4c38bc94dcbc168c67922cd04d740db8c857',
		'6c50cef0ce74b771f5cb8305a4a11b3c6f86893d',
		'f1ba6403c89fc807565b7d6d3cfbb61c9fe4d09f',
		'ad503ab5e4c6425369d4eb8c4163e2fe0c6bf306',
		'12f24f9e35932a417150a7a8302662a9eb41530f',
		'45b9a60339f69649147732a9a92e030cff055d5e',
		'e6e1592c49c0ae0204d9595740e73cbc95421554',
		'2888a3c5471aab022730d15bbdcbd26cceafa21c',
		'c0e874d892a90cd764e2c23b6e45ad09c3e7772a',
		'09ac707c8b0240820ce744bd348ad2208079c98e',
		'779bec6d77ae8e25e65109f0123ce901250626a2',
		'80740db10111fad05c071c84d507ee1cacc7ea7a',
		'8b505e0f0b11200b62237ee7454a08a12fc4559e',
		'26560b7eced3bb5ab408a44d1363349ec3178fcc',
		'1a77eae724e4077c79b0553c56051be032ed41d4',
		'ffe7a496065f218a28bd204b73a0848a5cfbb611',
		'fe803be6145bf62023ffa553bde2dce997e2a02c',
		'cab63bc6bed1668aacb6b0282d621cddb131e507',
		'e961681fef660b078b5ef1a0fc0ca9b1fd326be8',
		'df59e36a35c28956188a56ee28bafb295bcd458f',
		'fb89281c979b7bfe87861346da6471ff0e20a5b3',
		'0478b2ddbf16a012a74e2439e068f0539402182f',
		'b0497f9c483803dca50c84dd3a83fdccb3b33783',
		'9400609a33fffd634166e807435f5dc4f28936a6',
		'02bae446cf4f34e1510a81a67b589deebdcc9c76',
		'df415e87e58169fe1bcf41137cca841aef2ceaa3',
		'a71a79216f1b0730d7fd9ab3263b3b7204ed9d2c',
		'a64d826efa14d3c445ea17530c50a30a33a87436',
		'a83fbbd23bffe4a0f84b27eef2f32bfd5f48ce2c',
		'08557ac12dbf337baeabdc63067caff0bdfaabd3',
		'37ff2165ad71fb1878b0300479d91f2579f1bf8a',
		'8f01c735cd92c025a0d9bc40279ceb64d2f182cb',
		'392f798d86e366e5c6b17bbd914a9eeddce0eb52',
		'e9f62f23aa6a981b9f455faa4503ff1ffeb820e7',
		'0f36a70642bee5acb61f08e07485105e33f615db',
		'd4ef9a36b8656f84fd47f7202fb532d59ac2c4e6',
		'75fe9c54e78dbfdeb4e949aa8e5391acb1cf6e26',
		'd7e8cd550bea59928dadbaf4c40ff2f997eaca4b',
		'd45d3ba95d0976501f557e8d8356c4592d0ab124',
		'3cebb90583be3af68ff885ecc98bb16a616d7a72',
		'd1cef0a97cc4a6cd2b78f39d0f10bd06a0c4e5a5',
		'1234359d3cf888ab728e30056dced04f00f2f160',
		'cf2da2498b3a3adb1825ef106e62eeae31547166',
		'a841539c55b2f8079f65fa326fd57558045e6b6b',
		'd2229e3c8ad503024d710c4f4b8c5ffede0e280c',
		'a3686dc220a6f32d5c65ceaef759f43f410c0a34',
		'ab3508b13cbb42444dcc9ec443ea940892c04251',
		'97f9f0a29c3b4b8f20d4f4bac60654737e66e76a',
		'7f86d48bbf8da32f35c7a8733e5f476cbd59bd9b',
		'be682b20ef73748ed3e4bc352911e8c750117a50',
		'17206b54d56752498f5551290054eb80c8f80823',
		'935099aaa35273fd2bc238e8c7fe92c73ca70595',
		'e88de0c32e8cae6ae17447092b22a971b9bc5baa',
		'88d0ba72923f6f7cbfe310c32bcfff7bd642f812',
		'583106fbd59dd1bff37a8d10255448b2324d49e3',
		'ec95b113789c38185f2d5182bd52d4cf8b7e22c7',
		'515b01df0c56f6aa141c95bc4fcce439f23cad0c',
		'd1afdc0af01e19d352114b65ebc1991049c8908c'
	];
</script>

<main class="prose mx-auto h-screen">
	<div class="flex h-screen flex-col justify-center">
		<h1 class="mb-0 text-5xl">[Mod] Interactive CYOA Creator Plus</h1>
		<h6>Created by MeanDelay / Modified by Wahaha303</h6>
		<div class="my-8 flex flex-col gap-y-2">
			<Button href="/creator">Open Image-CYOA Creator</Button>
			<Button href="/viewer">Open Image-CYOA Viewer</Button>
			<Button href="/help">Help And Instructions</Button>
		</div>
		<div class="flex flex-row justify-end">
			<span>Update: 28.02.2021</span>
		</div>
		<span>TODO Commits from ICCPlus ({commits.length}):</span>
		<ScrollArea class="not-prose h-[200px] text-xs">
			{#each commits as commit (commit)}
				<a href="https://github.com/wahaha303/ICCPlus/commit/{commit}">
					<p>{commit.substring(0, 7)}</p>
				</a>
			{/each}
		</ScrollArea>
		<span>TODO After Everything is Done</span>
		<ScrollArea class="not-prose h-[200px] text-xs">
			<p>Make sure every ID is unique so I can exploit svelte keyed each</p>
			<p>Adjust design components so they're more compact</p>
		</ScrollArea>
	</div>
</main>
