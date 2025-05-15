const API_BASE_URL = 'https://api.example.com/api'; // Replace with your actual API URL

export const atmService = {
  getAllATMs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/atms`);
      if (!response.ok) {
        throw new Error('Failed to fetch ATMs');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching ATMs:', error);
      // Return our local data as fallback
      return fallbackATMs;
    }
  },

  getATMsByLocation: async (latitude, longitude, radius) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/atms/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch nearby ATMs');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching nearby ATMs:', error);
      return [];
    }
  }
};

// Fallback data in case API fails
const fallbackATMs = [
  {
    id: 1,
    atmName: "Nepal Bank Limited ATM",
    atmLocation: "Kathmandu",
    transactionFee: "NPR 20",
    latitude: 27.7046,
    longitude: 85.3072,
    features: ["24/7 Access", "Card-less Withdrawal", "Cash Deposit"],
    bankLogo: "https://example.com/nepal-bank-logo.png"
  },
  {
    id: 2,
    atmName: "Nabil Bank ATM",
    atmLocation: "Pokhara",
    transactionFee: "NPR 18",
    latitude: 28.2096,
    longitude: 83.9856,
    features: ["24/7 Access", "International Cards"],
    bankLogo: "https://example.com/nabil-bank-logo.png"
  },
  {
    id: 3,
    atmName: "Himalayan Bank ATM",
    atmLocation: "Lalitpur",
    transactionFee: "NPR 25",
    latitude: 27.6667,
    longitude: 85.3167,
    features: ["24/7 Access", "Card-less Withdrawal"],
    bankLogo: "https://example.com/himalayan-bank-logo.png"
  },
  {
    id: 4,
    atmName: "Kumari Bank ATM",
    atmLocation: "Bhaktapur",
    transactionFee: "NPR 15",
    latitude: 27.6710,
    longitude: 85.4298,
    features: ["24/7 Access"],
    bankLogo: "https://example.com/kumari-bank-logo.png"
  },
  {
    id: 5,
    atmName: "Standard Chartered Bank ATM",
    atmLocation: "Biratnagar",
    transactionFee: "NPR 30",
    latitude: 26.4525,
    longitude: 87.2718,
    features: ["24/7 Access", "International Cards", "Card-less Withdrawal"],
    bankLogo: "https://example.com/standard-chartered-logo.png"
  },
  {
    id: 6,
    atmName: "NIC Asia Bank ATM",
    atmLocation: "Baneshwor",
    transactionFee: "NPR 20",
    latitude: 27.6870,
    longitude: 85.3400,
    features: ["24/7 Access", "Card-less Withdrawal"],
    bankLogo: "https://example.com/nic-asia-logo.png"
  },
  {
    id: 7,
    atmName: "Global IME Bank ATM",
    atmLocation: "Chabahil",
    transactionFee: "NPR 20",
    latitude: 27.7150,
    longitude: 85.3500,
    features: ["24/7 Access"],
    bankLogo: "https://example.com/global-ime-logo.png"
  },
  {
    id: 8,
    atmName: "Prabhu Bank ATM",
    atmLocation: "Gongabu",
    transactionFee: "NPR 15",
    latitude: 27.7300,
    longitude: 85.3400,
    features: ["24/7 Access", "Card-less Withdrawal"],
    bankLogo: "https://example.com/prabhu-bank-logo.png"
  }
]; 