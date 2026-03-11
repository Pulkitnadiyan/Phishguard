import re
from urllib.parse import urlparse

def extract_features(url):
    """
    Extract numerical features from a given URL for machine learning classification.
    """
    
    # 1. Parse the URL
    try:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        path = parsed_url.path
    except Exception:
        domain = ""
        path = ""

    # Feature 1: Length of URL
    url_length = len(url)
    
    # Feature 2: Length of domain
    domain_length = len(domain)
    
    # Feature 3: Number of dots in URL
    dot_count = url.count('.')
    
    # Feature 4: Number of hyphens in domain
    hyphen_count = domain.count('-')
    
    # Feature 5: Check for IP address in domain
    # Simple regex for IPv4
    has_ip = 1 if re.search(r'([0-9]{1,3}\.){3}[0-9]{1,3}', domain) else 0
    
    # Feature 6: Count of '@' symbol
    at_count = url.count('@')
    
    # Feature 7: Count of '//' symbol (excluding http:// or https://)
    double_slash_count = url[min(8, len(url)):].count('//')
    
    # Feature 8: Presence of suspicious words
    suspicious_words = ['login', 'verify', 'update', 'secure', 'account', 'banking', 'confirm']
    has_suspicious_word = 1 if any(word in url.lower() for word in suspicious_words) else 0

    return [
        url_length,
        domain_length,
        dot_count,
        hyphen_count,
        has_ip,
        at_count,
        double_slash_count,
        has_suspicious_word
    ]

# Feature names mapped to the array indices above for reference
FEATURE_NAMES = [
    'url_length',
    'domain_length',
    'dot_count',
    'hyphen_count',
    'has_ip',
    'at_count',
    'double_slash_count',
    'has_suspicious_word'
]
