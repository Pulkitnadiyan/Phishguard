import React from 'react';

const Awareness = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold text-accent mb-8 text-center">Phishing Awareness & Support</h1>
            
            <p className="text-lg text-slate-300 mb-8 text-center">
                Knowledge is your best defense against cyber threats. Learn how to identify, prevent, and respond to phishing attacks.
            </p>

            <div className="space-y-12">
                {/* How to Identify Phishing */}
                <section className="bg-secondary p-8 rounded-lg shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        How to Identify Phishing Websites
                    </h2>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-2">1.</span>
                            <div>
                                <strong className="text-white">Check the URL Carefully:</strong> Look for subtle misspellings (e.g., faceb0ok instead of facebook) or strange domain extensions.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-2">2.</span>
                            <div>
                                <strong className="text-white">Inspect Security Indicators:</strong> Genuine sites use HTTPS. However, a padlock doesn't guarantee safety since scammers also use HTTPS. It's a baseline, not a proof of legitimacy.
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-2">3.</span>
                            <div>
                                <strong className="text-white">Sense of Urgency:</strong> Scammers often create a false sense of panic ("Your account will be suspended in 24 hours").
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-accent font-bold mr-2">4.</span>
                            <div>
                                <strong className="text-white">Requests for Sensitive Info:</strong> Legitimate organizations will rarely ask for your full password, OTP, or PIN over email or text.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Spreading Awareness */}
                <section className="bg-secondary p-8 rounded-lg shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                        Spread Awareness
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                        <div className="bg-primary p-4 rounded border border-gray-600">
                            <h3 className="font-bold text-accent mb-2">Educate Others</h3>
                            <p className="text-sm">Share common scaring tactics with family and friends. Older adults and children are particularly vulnerable.</p>
                        </div>
                        <div className="bg-primary p-4 rounded border border-gray-600">
                            <h3 className="font-bold text-accent mb-2">Use 2FA / MFA</h3>
                            <p className="text-sm">Always enable Two-Factor Authentication. It acts as a safety net even if your password is compromised.</p>
                        </div>
                        <div className="bg-primary p-4 rounded border border-gray-600">
                            <h3 className="font-bold text-accent mb-2">Verify Independently</h3>
                            <p className="text-sm">If you receive a suspicious message from a bank, don't click the link. Call them directly using an official number.</p>
                        </div>
                        <div className="bg-primary p-4 rounded border border-gray-600">
                            <h3 className="font-bold text-accent mb-2">Keep Software Updated</h3>
                            <p className="text-sm">Regularly update your OS, browsers, and antivirus software to patch security vulnerabilities.</p>
                        </div>
                    </div>
                </section>

                {/* Helpline Numbers */}
                <section className="bg-gradient-to-r from-red-900 to-red-700 p-8 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Helpline Numbers (India)
                    </h2>
                    <p className="mb-4">If you suspect you are a victim of a cybercrime, contact authorities immediately:</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-black bg-opacity-30 p-4 rounded">
                            <span className="font-bold">National Cyber Crime Reporting Helpline</span>
                            <span className="text-2xl font-mono text-yellow-300">1930</span>
                        </div>
                        <div className="flex items-center justify-between bg-black bg-opacity-30 p-4 rounded">
                            <span className="font-bold">National Police Helpline</span>
                            <span className="text-2xl font-mono text-yellow-300">112</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-200">
                                <strong>Portal:</strong> Register a complaint directly at <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="text-blue-300 underline">cybercrime.gov.in</a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Solutions & Remediation */}
                <section className="bg-secondary p-8 rounded-lg shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        Solutions: What to Do if Scammed
                    </h2>
                    <ul className="space-y-4 text-slate-300 list-disc list-inside">
                        <li><strong>Disconnect:</strong> If you downloaded malware, disconnect your device from the internet immediately to prevent data exfiltration.</li>
                        <li><strong>Contact Bank:</strong> Block your debit/credit cards and freeze bank accounts linked to the compromised data.</li>
                        <li><strong>Change Passwords:</strong> Change passwords for all important accounts (email, banking, social media) from a safe, uncompromised device.</li>
                        <li><strong>Scan for Malware:</strong> Run a full system antivirus scan on your computer or phone.</li>
                        <li><strong>Monitor Accounts:</strong> Keep a close eye on your bank statements and credit reports for unauthorized activities.</li>
                        <li><strong>Report:</strong> File an official complaint with your local cyber cell or national portal to help authorities take action.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Awareness;
