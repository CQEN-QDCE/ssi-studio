# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY replace_placeholders.sh /

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/ssi-studio /etc/nginx/html

ENTRYPOINT [ "sh", "/replace_placeholders.sh" ]

CMD ["nginx",  "-g", "daemon off;"]