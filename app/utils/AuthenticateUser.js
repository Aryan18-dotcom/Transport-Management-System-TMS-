"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; 


export const useAuthSession = (redirectPath = '/login') => {
    const router = useRouter();
    const [user, setUser] = useState(null); // Use null for initial state if no user
    const [loading, setLoading] = useState(true); // Start loading as we immediately fetch
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            // Loading is already true from useState(true)
            try {
                // 1. Fetch the session endpoint
                const res = await fetch("/api/session", {
                    credentials: "include",
                });

                // Check for non-200 status codes (e.g., 401, 404, 500)
                if (!res.ok) {
                    toast.info("Session expired or unauthorized. Please log in.");
                    setIsAuthenticated(false);
                    router.push(redirectPath);
                    return;
                }

                // 2. Safely parse the JSON data
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    console.error("Error while parsing session data:", e);
                    toast.error("Invalid session data format. Please log in.");
                    setIsAuthenticated(false);
                    router.push(redirectPath);
                    return;
                }

                // 3. Final authentication check on the parsed data payload
                if (data.isAuthenticated) {
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    toast.info("Please Login First!");
                    setIsAuthenticated(false);
                    router.push(redirectPath);
                }

            } catch (error) {
                console.error("Network error during session fetch:", error);
                toast.error("A network error occurred. Please try logging in again.");
                setIsAuthenticated(false);
                router.push(redirectPath);

            } finally {
                // Always set loading to false once the fetch process is complete
                setLoading(false);
            }
        };

        fetchSession();
        // The router dependency is implicitly handled by the hook's structure
    }, [router, redirectPath]);

    // Return the state for the consuming component to use
    return { user, loading, isAuthenticated };
};