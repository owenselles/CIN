const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

export default class Firestore {

    // Get all the players
    static async getPlayers() {
        const players = await db.collection('players').get();
        return players.docs.map((doc: { data: () => any; }) => doc.data());
    }

    // Get a player by id
    static async getPlayer(id: string) {
        const player = await db.collection('players').doc(id).get();
        return player.data();
    }

    // Get plaer by name
    static async getPlayerByName(name: string) {
        const player = await db.collection('players').where('name', '==', name).get();
        return player.docs.map((doc: { data: () => any; }) => doc.data());
    }

    // Get the score of a player
    static async getPlayerScore(id: string) {
        const player = await db.collection('players').doc(id).get();
        return player.data().score;
    }

    // Get all the scores of all the players sorted by score
    static async getScores() {
        const players = await db.collection('players').orderBy('score', 'desc').get();
        return players.docs.map((doc: { data: () => any; }) => doc.data());
    }

    



}