// ==========================================================
// blockchain.js
// Basic Client-Side Blockchain Simulation for Hackathon Project
// Used for: 1. Immutable Incident Logging 2. Digital ID Tracking
// ==========================================================

// --- 1. Block Class ---
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;               // The block number (height)
        this.timestamp = timestamp;       // When the block was created
        this.data = data;                 // The core data (Incident Log or Digital ID info)
        this.previousHash = previousHash; // Hash of the previous block
        this.hash = this.calculateHash(); // The current block's hash
    }

    // A simple, non-cryptographic hash simulation for demonstration
    calculateHash() {
        // Concatenates all block data into a string for hashing
        const hashInput = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
        return simpleHash(hashInput);
    }
}

// --- 2. Blockchain Class ---
class Blockchain {
    constructor() {
        // Attempt to load existing chain from browser's local storage
        const savedChain = localStorage.getItem('incidentChain');
        if (savedChain) {
            try {
                const parsedChain = JSON.parse(savedChain);
                // Rebuild chain from saved data to ensure Block methods are available
                this.chain = parsedChain.map(blockData => 
                    new Block(blockData.index, blockData.timestamp, blockData.data, blockData.previousHash)
                );
                console.log("Blockchain: Loaded existing chain from storage. Total blocks:", this.chain.length);
                return;
            } catch (e) {
                console.error("Blockchain: Error loading chain, starting new one.", e);
            }
        }
        // If no chain or error loading, create Genesis Block
        this.chain = [this.createGenesisBlock()];
        console.log("Blockchain: Started new chain.");
    }

    // The first block
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block: Smart Tourist System Initialized", "0");
    }

    // Get the latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block (log an incident or register a DID)
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash(); // Recalculate hash with new prev hash
        this.chain.push(newBlock);
        
        // Save the chain to localStorage (simulating a permanent ledger)
        localStorage.setItem('incidentChain', JSON.stringify(this.chain));
        
        const logType = newBlock.data.incidentType || newBlock.data.type;
        console.log("✅ Block Added:", logType, "| Hash:", newBlock.hash.substring(0, 8) + '...');
    }
}

// --- 3. Simulated Hashing Function ---
// Simple non-cryptographic hash for demonstration purposes
function simpleHash(input) {
    let hash = 0;
    if (input.length === 0) return 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
}

// --- 4. Initialization & Global Variables ---
// Initialize the chain and define a simulated Global Tourist Digital ID
const smartTouristChain = new Blockchain();
const TOURIST_DID = "DID:TOURIST:T7654321";