"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE = "http://localhost:5000/api"; // backend URL

export default function TimelineSMS() {
    const [phone, setPhone] = useState("");
    const [registered, setRegistered] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch alerts from backend
    const fetchAlerts = async () => {
        try {
            const res = await axios.get(`${API_BASE}/alerts`);
            setAlerts(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch alerts");
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleRegister = async () => {
        if (!phone) {
            setError("Please enter a phone number");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/register-phone`, { phoneNumber: "+91" + phone });

            if (res.data.success) {
                setRegistered(true);
                fetchAlerts(); // refetch alerts after registration
            }
        } catch (err) {
            console.error(err);
            setError("Failed to register phone");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {!registered ? (
                <div className="text-center py-6">
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="border p-2 rounded mb-2"
                    />
                    <Button onClick={handleRegister} disabled={loading}>
                        {loading ? "Registering..." : "Register & Get Alerts"}
                    </Button>
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
            ) : (
                <div className="text-center py-6 text-green-600">
                    ✅ Phone registered successfully! You will receive alerts via SMS.
                </div>
            )}

            {alerts.length > 0 && (
                <div className="space-y-4">
                    {alerts.map(alert => (
                        <Card key={alert._id}>
                            <CardHeader>
                                <CardTitle>{alert.title}</CardTitle>
                                <CardDescription>{alert.type}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{alert.description}</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(alert.date).toLocaleDateString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
