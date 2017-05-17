FROM node:7-alpine

LABEL maintainer "iCrawl <icrawltogo@gmail.com>"

# Add package.json for Yarn
WORKDIR /usr/src/Listen.moe
COPY package.json .

#  Install dependencies
RUN apk add --update \
&& apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl pixman-dev cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev python g++ make \
\
# Install node.js dependencies
&& yarn install \
\
# Clean up build dependencies
&& apk del .build-deps

# Add project source
COPY . .

ENV TOKEN= \
	COMMAND_PREFIX= \
	OWNERS= \
	DB= \
	REDIS= \
	STREAM= \
	USER_AGENT= \
	RADIO_CHANNELS= \
	GOOGLE_API= \
	SOUNDCLOUD_API= \
	PAGINATED_ITEMS= \
	DEFAULT_VOLUME= \
	MAX_LENGTH= \
	MAX_SONGS= \
	PASSES=

CMD ["node", "sharder.js"]
