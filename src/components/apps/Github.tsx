import React, { useEffect, useState } from 'react';
import { Star, Users, MapPin, Link as LinkIcon, Loader } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    html_url: string;
}

interface Profile {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
    location: string;
    blog: string;
    html_url: string;
}

export const GithubApp: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, reposRes] = await Promise.all([
                    fetch('https://api.github.com/users/Abishekdl'),
                    fetch('https://api.github.com/users/Abishekdl/repos?sort=updated&per_page=10')
                ]);

                if (!profileRes.ok || !reposRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const profileData = await profileRes.json();
                const reposData = await reposRes.json();

                setProfile(profileData);
                setRepos(reposData);
                setLoading(false);

            } catch (err) {
                console.error(err);
                setError('Failed to load GitHub data. API rate limit might be exceeded.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-[#0d1117] text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader size={48} className="animate-spin text-gray-400" />
                    <p className="text-gray-400">Loading GitHub Profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="h-full flex items-center justify-center bg-[#0d1117] text-white">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white overflow-auto transition-colors duration-300">
            {/* Header Banner */}
            <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-900 dark:to-purple-900 opacity-50" />
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-12">
                <div className="flex flex-col md:flex-row gap-8 -mt-12 relative z-10">
                    {/* Profile Sidebar */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <img
                                src={profile.avatar_url}
                                alt={profile.name}
                                className="w-48 h-48 rounded-full border-4 border-white dark:border-[#0d1117] shadow-xl"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-light">{profile.login}</p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>

                            <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users size={16} />
                                    <span className="font-bold text-gray-900 dark:text-white">{profile.followers}</span> followers
                                    <span>·</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{profile.following}</span> following
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {profile.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <LinkIcon size={16} />
                                    <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {profile.blog}
                                    </a>
                                </div>
                            </div>

                            <a
                                href={profile.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 bg-gray-100 dark:bg-[#21262d] border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors text-gray-900 dark:text-white"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    {/* Repositories Grid */}
                    <div className="w-full md:w-2/3 pt-12">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Popular Repositories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {repos.map((repo) => (
                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex flex-col justify-between h-32 shadow-sm dark:shadow-none"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-blue-600 dark:text-blue-400 truncate">{repo.name}</span>
                                            <span className="px-2 py-0.5 text-xs border border-gray-200 dark:border-gray-700 rounded-full text-gray-500 dark:text-gray-400">Public</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{repo.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-4">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            {repo.language}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={14} />
                                            {repo.stargazers_count}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
