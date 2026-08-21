import { Server } from 'socket.io';
import riderModel from './src/model/rider.model.js';
import userModel from './src/model/user.model.js';
import envVariables from './src/config/envConfig.js';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://probable-space-fishstick-g4j5vjr6wjqx2vwg-5173.app.github.dev",
                "https://ld5859dw-5173.inc1.devtunnels.ms",
                envVariables.FRONTEND_URL
            ],
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data, acknowledge) => {
            const { userId, userType } = data;

            try {
                const model = userType === 'user'
                    ? userModel
                    : userType === 'rider'
                        ? riderModel
                        : null;

                if (!model || !userId) {
                    return acknowledge?.({ success: false, message: 'Invalid join data' });
                }

                const updatedRecord = await model.findByIdAndUpdate(
                    userId,
                    { socketId: socket.id },
                    { new: true }
                );

                if (!updatedRecord) {
                    return acknowledge?.({ success: false, message: 'User was not found' });
                }

                acknowledge?.({ success: true, socketId: socket.id });
            } catch (error) {
                console.error('Could not save socket ID:', error);
                acknowledge?.({ success: false, message: 'Could not save socket ID' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            const latitude = Number(location?.ltd);
            const longitude = Number(location?.lng);

            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await riderModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
    console.log('Sending socket message:', { socketId, event: messageObject.event });

    if (io) {
        if (!socketId) {
            console.error('Socket ID is missing, cannot send message');
            return;
        }
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`Message sent to ${socketId}`);
    } else {
        console.log('Socket.io not initialized.');
    }
};